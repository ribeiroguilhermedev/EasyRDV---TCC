package br.com.app.Utils;

import java.util.Date;

public class Utils {
    public static boolean compareDoubles(double v1, double v2) {
        return Double.compare(v1, v2) == 0;
    }
    public static boolean doubleIsGreaterThan(Double v1, Double v2) {
        return Double.compare(v1, v2) > 0;
    }
    public static boolean doubleIsLessThan(Double v1, Double v2) {
        return Double.compare(v1, v2) < 0;
    }
}
